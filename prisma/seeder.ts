/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create countries
  const countries = await prisma.$transaction(async (prisma) => {
    const countries_ = await prisma.countries.createMany({
      data: [
        {
          code: '57',
          name: 'Colombia',
        },
      ],
    });
    return countries_;
  });

  // Create departments
  const departments = await prisma.$transaction(async (prisma) => {
    const departments_ = await prisma.departments.createMany({
      data: [
        {
          code: '05',
          name: 'Antioquia',
          idCountry: 1,
        },
        {
          code: '08',
          name: 'Atlántico',
          idCountry: 1,
        },
        {
          code: '11',
          name: 'Bogotá D.C.',
          idCountry: 1,
        },
        {
          code: '13',
          name: 'Bolívar',
          idCountry: 1,
        },
        {
          code: '15',
          name: 'Boyacá',
          idCountry: 1,
        },
        {
          code: '17',
          name: 'Caldas',
          idCountry: 1,
        },
        {
          code: '18',
          name: 'Caquetá',
          idCountry: 1,
        },
        {
          code: '19',
          name: 'Cauca',
          idCountry: 1,
        },
        {
          code: '20',
          name: 'Cesar',
          idCountry: 1,
        },
        {
          code: '23',
          name: 'Córdoba',
          idCountry: 1,
        },
        {
          code: '25',
          name: 'Cundinamarca',
          idCountry: 1,
        },
        {
          code: '27',
          name: 'Chocó',
          idCountry: 1,
        },
        {
          code: '41',
          name: 'Huila',
          idCountry: 1,
        },
        {
          code: '44',
          name: 'La Guajira',
          idCountry: 1,
        },
        {
          code: '47',
          name: 'Magdalena',
          idCountry: 1,
        },
        {
          code: '50',
          name: 'Meta',
          idCountry: 1,
        },
        {
          code: '52',
          name: 'Nariño',
          idCountry: 1,
        },
        {
          code: '54',
          name: 'Norte de Santander',
          idCountry: 1,
        },
        {
          code: '63',
          name: 'Quindío',
          idCountry: 1,
        },
        {
          code: '66',
          name: 'Risaralda',
          idCountry: 1,
        },
        {
          code: '68',
          name: 'Santander',
          idCountry: 1,
        },
        {
          code: '70',
          name: 'Sucre',
          idCountry: 1,
        },
        {
          code: '73',
          name: 'Tolima',
          idCountry: 1,
        },
        {
          code: '76',
          name: 'Valle del Cauca',
          idCountry: 1,
        },
        {
          code: '81',
          name: 'Arauca',
          idCountry: 1,
        },
        {
          code: '85',
          name: 'Casanare',
          idCountry: 1,
        },
        {
          code: '86',
          name: 'Putumayo',
          idCountry: 1,
        },
        {
          code: '88',
          name: 'San Andrés, Providencia y Santa Catalina',
          idCountry: 1,
        },
        {
          code: '91',
          name: 'Amazonas',
          idCountry: 1,
        },
        {
          code: '94',
          name: 'Vaupés',
          idCountry: 1,
        },
        {
          code: '95',
          name: 'Guainía',
          idCountry: 1,
        },
        {
          code: '97',
          name: 'Vichada',
          idCountry: 1,
        },
      ],
    });

    return departments_;
  });

  // Create municipalities
  const municipalities = await prisma.$transaction(async (prisma) => {
    const municipalities_ = await prisma.municipalities.createMany({
      data: [
        {
          code: '05002',
          name: 'Abejorral',
          idDepartment: 1,
        },
        {
          code: '05021',
          name: 'Alejandría',
          idDepartment: 1,
        },
        {
          code: '05055',
          name: 'Argelia',
          idDepartment: 1,
        },
        {
          code: '05148',
          name: 'Carmen De Viboral',
          idDepartment: 1,
        },
        {
          code: '05197',
          name: 'Cocorná',
          idDepartment: 1,
        },
        {
          code: '05206',
          name: 'Concepción',
          idDepartment: 1,
        },
        {
          code: '05313',
          name: 'Granada',
          idDepartment: 1,
        },
        {
          code: '05318',
          name: 'Guarne',
          idDepartment: 1,
        },
        {
          code: '05321',
          name: 'Guatape',
          idDepartment: 1,
        },
        {
          code: '05376',
          name: 'La Ceja',
          idDepartment: 1,
        },
        {
          code: '05400',
          name: 'La Unión',
          idDepartment: 1,
        },
        {
          code: '05440',
          name: 'Marinilla',
          idDepartment: 1,
        },
        {
          code: '05483',
          name: 'Nariño',
          idDepartment: 1,
        },
        {
          code: '05541',
          name: 'Peñol',
          idDepartment: 1,
        },
        {
          code: '05607',
          name: 'Retiro',
          idDepartment: 1,
        },
        {
          code: '05615',
          name: 'Rionegro',
          idDepartment: 1,
        },
        {
          code: '05649',
          name: 'San Carlos',
          idDepartment: 1,
        },
        {
          code: '05652',
          name: 'San Francisco',
          idDepartment: 1,
        },
        {
          code: '05660',
          name: 'San Luis',
          idDepartment: 1,
        },
        {
          code: '05667',
          name: 'San Rafael',
          idDepartment: 1,
        },
        {
          code: '05674',
          name: 'San Vicente',
          idDepartment: 1,
        },
        {
          code: '05697',
          name: 'Santuario',
          idDepartment: 1,
        },
        {
          code: '05756',
          name: 'Sonson',
          idDepartment: 1,
        },
        {
          code: '05030',
          name: 'Amaga',
          idDepartment: 1,
        },
        {
          code: '05034',
          name: 'Andes',
          idDepartment: 1,
        },
        {
          code: '05036',
          name: 'Angelopolis',
          idDepartment: 1,
        },
        {
          code: '05091',
          name: 'Betania',
          idDepartment: 1,
        },
        {
          code: '05093',
          name: 'Betulia',
          idDepartment: 1,
        },
        {
          code: '05125',
          name: 'Caicedo',
          idDepartment: 1,
        },
        {
          code: '05145',
          name: 'Caramanta',
          idDepartment: 1,
        },
        {
          code: '05101',
          name: 'Ciudad Bolívar',
          idDepartment: 1,
        },
        {
          code: '05209',
          name: 'Concordia',
          idDepartment: 1,
        },
        {
          code: '05282',
          name: 'Fredonia',
          idDepartment: 1,
        },
        {
          code: '05353',
          name: 'Hispania',
          idDepartment: 1,
        },
        {
          code: '05364',
          name: 'Jardín',
          idDepartment: 1,
        },
        {
          code: '05368',
          name: 'Jericó',
          idDepartment: 1,
        },
        {
          code: '05390',
          name: 'La Pintada',
          idDepartment: 1,
        },
        {
          code: '05467',
          name: 'Montebello',
          idDepartment: 1,
        },
        {
          code: '05576',
          name: 'Pueblorrico',
          idDepartment: 1,
        },
        {
          code: '05642',
          name: 'Salgar',
          idDepartment: 1,
        },
        {
          code: '05679',
          name: 'Santa Barbara',
          idDepartment: 1,
        },
        {
          code: '05789',
          name: 'Támesis',
          idDepartment: 1,
        },
        {
          code: '05792',
          name: 'Tarso',
          idDepartment: 1,
        },
        {
          code: '05809',
          name: 'Titiribí',
          idDepartment: 1,
        },
        {
          code: '05847',
          name: 'Urrao',
          idDepartment: 1,
        },
        {
          code: '05856',
          name: 'Valparaiso',
          idDepartment: 1,
        },
        {
          code: '05861',
          name: 'Venecia',
          idDepartment: 1,
        },
        {
          code: '05045',
          name: 'Apartadó',
          idDepartment: 1,
        },
        {
          code: '05051',
          name: 'Arboletes',
          idDepartment: 1,
        },
        {
          code: '05147',
          name: 'Carepa',
          idDepartment: 1,
        },
        {
          code: '05172',
          name: 'Chigorodó',
          idDepartment: 1,
        },
        {
          code: '05475',
          name: 'Murindó',
          idDepartment: 1,
        },
        {
          code: '05480',
          name: 'Mutata',
          idDepartment: 1,
        },
        {
          code: '05490',
          name: 'Necoclí',
          idDepartment: 1,
        },
        {
          code: '05659',
          name: 'San Juan De Uraba',
          idDepartment: 1,
        },
        {
          code: '05665',
          name: 'San Pedro De Uraba',
          idDepartment: 1,
        },
        {
          code: '05837',
          name: 'Turbo',
          idDepartment: 1,
        },
        {
          code: '05873',
          name: 'Vigía Del Fuerte',
          idDepartment: 1,
        },
        {
          code: '05079',
          name: 'Barbosa',
          idDepartment: 1,
        },
        {
          code: '05088',
          name: 'Bello',
          idDepartment: 1,
        },
        {
          code: '05129',
          name: 'Caldas',
          idDepartment: 1,
        },
        {
          code: '05212',
          name: 'Copacabana',
          idDepartment: 1,
        },
        {
          code: '05266',
          name: 'Envigado',
          idDepartment: 1,
        },
        {
          code: '05308',
          name: 'Girardota',
          idDepartment: 1,
        },
        {
          code: '05360',
          name: 'Itagui',
          idDepartment: 1,
        },
        {
          code: '05380',
          name: 'La Estrella',
          idDepartment: 1,
        },
        {
          code: '05001',
          name: 'Medellín',
          idDepartment: 1,
        },
        {
          code: '05631',
          name: 'Sabaneta',
          idDepartment: 1,
        },
        { code: '27006', name: 'Acandí', idDepartment: 12 }, // Chocó
        { code: '44207', name: 'Cabo de la Vela', idDepartment: 14 }, // La Guajira
        { code: '70212', name: 'Coveñas', idDepartment: 23 }, // Sucre
        { code: '27363', name: 'Juradó', idDepartment: 12 }, // Chocó
        { code: '91400', name: 'Letizia', idDepartment: 27 }, // Amazonas
        { code: '08421', name: 'Luruaco', idDepartment: 2 }, // Atlántico
        { code: '13429', name: 'Magangué', idDepartment: 4 }, // Bolívar
        { code: '44420', name: 'Maicao', idDepartment: 14 }, // La Guajira
        { code: '23473', name: 'Montelíbano', idDepartment: 10 }, // Córdoba
        { code: '27490', name: 'Nuquí', idDepartment: 12 }, // Chocó
        { code: '27510', name: 'Pizarro', idDepartment: 12 }, // Chocó
        { code: '88001', name: 'Providencia', idDepartment: 28 }, // Archipiélago de San Andrés, Providencia y Santa Catalina
        { code: '99001', name: 'Puerto Carreño', idDepartment: 32 }, // Vichada
        { code: '08573', name: 'Puerto Colombia', idDepartment: 2 }, // Atlántico
        { code: '23686', name: 'San Antero', idDepartment: 10 }, // Córdoba
        { code: '23702', name: 'San Bernardo del Viento', idDepartment: 10 }, // Córdoba
        { code: '23433', name: 'Santa Cruz de Lorica', idDepartment: 10 }, // Córdoba
        { code: '47001', name: 'Santa Marta', idDepartment: 15 }, // Magdalena
        { code: '44864', name: 'Uribia', idDepartment: 14 }, // La Guajira
        { code: '52835', name: 'Tumaco', idDepartment: 18 }, // Nariño
        { code: '76873', name: 'Tuluá', idDepartment: 24 }, // Valle del Cauca
        { code: '08873', name: 'Usiacurí', idDepartment: 2 }, // Atlántico
        { code: '20001', name: 'Valledupar', idDepartment: 9 }, // Cesar
        { code: '85001', name: 'Yopal', idDepartment: 26 }, // Casanare
      ],
    });

    return municipalities_;
  });

  // Create roles
  const roles = await prisma.$transaction(async (prisma) => {
    const roles_ = await prisma.roles.createMany({
      data: [
        {
          name: 'Administrator',
        },
        {
          name: 'Guía',
        },
        {
          name: 'Cliente',
        },
      ],
    });
    return roles_;
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
