import { services as serviceCards } from "../services/data";

export const navigation = [
  { name: 'Начало', href: '/' },
  { name: 'Проекти', href: '/gallery' },
  { name: 'За нас', href: '/about-us' },
  { name: 'Контакти', href: '/contact-us' },
];
export const services = serviceCards.map(({ id, title }) => ({ id, title }));
