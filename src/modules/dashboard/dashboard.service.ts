import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}
  async sales(): Promise<any> {
    const rawData: { date: string; count: number }[] = await this.prisma
      .$queryRaw` 
            WITH TotalPayments AS (
        SELECT  
          r.id,
          r.date,
          r.price as total_price,
          SUM(p.pay) as paid_amount
        FROM reservations r
        LEFT JOIN payments p ON p."idReservation" = r.id
        WHERE p.status = 'P' AND r.status = 'P'
        GROUP BY r.id, r.date, r.price
      )
      SELECT 
        DATE(date) as date,
        COUNT(*) as count
      FROM TotalPayments
      WHERE paid_amount >= total_price
      GROUP BY DATE(date)
      ORDER BY date ASC;
    `;

    if (!rawData || rawData.length === 0) {
      return { labels: [], datasets: [] };
    }

    const labels = rawData.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
    });

    const data = rawData.map((item) => Number(item.count)); // Convert BigInt to Number

    const datasets = [
      {
        data,
        backgroundColor: [
          '#6366F1',
          '#F59E0B',
          '#EC4899',
          '#581C87',
          '#DC2626',
        ],
      },
    ];

    return { labels, datasets };
  }

  async packageSales(): Promise<any> {
    const rawData: {
      year: number;
      month: number;
      package_name: string;
      total_sales: number;
    }[] = await this.prisma.$queryRaw`
      WITH CompletedReservations AS (
        SELECT 
          r.id,
          r.date,
          d."idPackage",
          EXTRACT(YEAR FROM r.date) as year,
          EXTRACT(MONTH FROM r.date) as month,
          r.price as total_price,
          SUM(CASE WHEN p.status = 'P' THEN p.pay ELSE 0 END) as paid_amount
        FROM reservations r
        JOIN dates d ON r."idDate" = d.id
        LEFT JOIN payments p ON p."idReservation" = r.id
        WHERE r.status = 'P'
        GROUP BY r.id, r.date, d."idPackage", r.price
        HAVING SUM(CASE WHEN p.status = 'P' THEN p.pay ELSE 0 END) >= r.price
      )
      SELECT 
        cr.year,
        cr.month,
        p.name as package_name,
        COUNT(DISTINCT cr.id) as total_sales
      FROM CompletedReservations cr
      JOIN packages p ON cr."idPackage" = p.id
      GROUP BY cr.year, cr.month, p.name, p.id
      ORDER BY cr.year DESC, cr.month ASC, total_sales DESC;
    `;

    if (!rawData || rawData.length === 0) {
      return { labels: [], datasets: [] };
    }

    const labels = Array.from(
      new Set(rawData.map((item) => `Mes ${item.month}`)),
    );
    const packageNames = Array.from(
      new Set(rawData.map((item) => item.package_name)),
    );

    const datasets = packageNames.map((packageName) => {
      const data = labels.map((label) => {
        const month = parseInt(label.split(' ')[1], 10);
        const entry = rawData.find(
          (item) => item.package_name === packageName && item.month === month,
        );
        return entry ? Number(entry.total_sales) : 0; // Convert BigInt to Number
      });

      return {
        label: packageName,
        backgroundColor: this.getColorForPackage(packageName),
        data,
      };
    });

    return { labels, datasets };
  }

  private getColorForPackage(packageName: string): string {
    const colorMap: { [key: string]: string } = {
      Cartagena: '#FCD34D',
      Baru: '#22C55E',
      'Santa Marta': '#EC4899',
      Covenas: '#8B5CF6',
    };
    return colorMap[packageName] || this.getRandomColor();
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async topClients(): Promise<any[]> {
    const rawData: {
      name: string;
      surName: string;
      total_reservations: number;
      total_spent: number;
    }[] = await this.prisma.$queryRaw`
      SELECT 
        u.name,
        u."surName",
        COUNT(r.id) as total_reservations,
        COALESCE(SUM(r.price), 0) as total_spent
      FROM users u
      JOIN reservations r ON r."idUser" = u.id
      WHERE r.status = 'P'
      GROUP BY u.name, u."surName"
      ORDER BY total_reservations DESC, total_spent DESC
      LIMIT 3;
    `;

    if (!rawData || rawData.length === 0) {
      return [];
    }

    return rawData.map((client) => ({
      name: `${client.name} ${client.surName}`,
      purchases: Number(client.total_reservations), // Convert BigInt to Number
      total: Number(client.total_spent), // Convert BigInt to Number
    }));
  }
}
