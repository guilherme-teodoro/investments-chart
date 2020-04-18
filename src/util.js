import { format } from "date-fns";
import { pt } from "date-fns/locale";

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(timestamp) {
  return format(new Date(timestamp), "dd LLL yyyy", { locale: pt });
}
