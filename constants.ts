import { Commune } from './types';

// Center of Iași
export const MAP_CENTER: [number, number] = [47.1636, 27.5855]; // Centered closer to Piața Unirii
export const ZOOM_LEVEL = 11.5;

export const COMMUNES: Commune[] = [
  {
    id: 1,
    name: "Aroneanu",
    lat: 47.2031,
    lng: 27.6083,
    routes: [
      { id: '25', number: '25', name: 'Podu Roș - Aroneanu', description: 'Legătură directă centru - nord.' },
    ]
  },
  {
    id: 2,
    name: "Bârnova",
    lat: 47.0754,
    lng: 27.6322,
    routes: [
      { id: '202', number: '202', name: 'Podu Roș - Păun', description: 'Traseu zona colinară Bucium.' },
      { id: '203', number: '203', name: 'Iași - Pietrăria', description: 'Acces zona de agrement.' }
    ]
  },
  {
    id: 3,
    name: "Ciurea",
    lat: 47.1122,
    lng: 27.5739,
    routes: [
      { id: '27', number: '27', name: 'Tătărași - Ciurea', description: 'Traseu principal prin Centrul Civic.' },
      { id: '41', number: '41', name: 'Podu Roș - Ciurea', description: 'Traseu rapid spre zona industrială.' },
      { id: '44', number: '44', name: 'Dacia - Ciurea', description: 'Traversează cartierul Dacia și Alexandru.' }
    ]
  },
  {
    id: 4,
    name: "Holboca",
    lat: 47.1606,
    lng: 27.6830,
    routes: [
      { id: '20', number: '20', name: 'Tătărași Sud - Holboca', description: 'Traseu scurt de legătură.' },
      { id: '405', number: '405', name: 'Iași - Dancu', description: 'Conexiune intermodală tramvai.' }
    ]
  },
  {
    id: 5,
    name: "Miroslava",
    lat: 47.1472,
    lng: 27.5056,
    routes: [
      { id: '23', number: '23', name: 'Podu Roș - Miroslava', description: 'Traseu spre Primărie și Liceu.' },
      { id: '501', number: '501', name: 'Podu Roș - Vorovești', description: 'Deservește satele componente.' }
    ]
  },
  {
    id: 6,
    name: "Popricani",
    lat: 47.2342,
    lng: 27.5458,
    routes: [
      { id: '701', number: '701', name: 'Târgu Cucu - Popricani', description: 'Acces zona metropolitană Nord.' },
      { id: '702', number: '702', name: 'Copou - Vânători', description: 'Traseu prin zona de agrement.' }
    ]
  },
  {
    id: 7,
    name: "Rediu",
    lat: 47.2000,
    lng: 27.5300,
    routes: [
      { id: '703', number: '703', name: 'Păcurari - Rediu', description: 'Legătură cu rond Păcurari.' },
      { id: '704', number: '704', name: 'Breazu - Copou', description: 'Legătură directă cu Universitatea.' }
    ]
  },
  {
    id: 8,
    name: "Tomești",
    lat: 47.1350,
    lng: 27.7000,
    routes: [
      { id: '29', number: '29', name: 'Podu Roș - Tomești', description: 'Traseu cu frecvență ridicată.' },
      { id: '801', number: '801', name: 'Tomești - Goruni', description: 'Extensie zona deal.' }
    ]
  },
  {
    id: 9,
    name: "Valea Lupului",
    lat: 47.1700,
    lng: 27.5000,
    routes: [
      { id: '20', number: '20', name: 'Carrefour Era - Tătărași', description: 'Traseu comercial complex.' },
      { id: '901', number: '901', name: 'Gara - Valea Lupului', description: 'Legătură directă gară - periferie.' }
    ]
  }
];