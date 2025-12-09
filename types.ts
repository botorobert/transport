export interface Route {
  id: string;
  number: string;
  name: string;
  description: string;
}

export interface Commune {
  id: number;
  name: string;
  lat: number;
  lng: number;
  routes: Route[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}