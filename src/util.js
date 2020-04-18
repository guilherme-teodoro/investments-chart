import { format } from "date-fns";
import { pt } from "date-fns/locale";

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(date) {
  return format(date, "dd LLL yyyy", { locale: pt });
}
