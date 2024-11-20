import { CreateReservaDTO } from "src/reservas/dto/create-reserva-dto";
import { Identification } from "./card_holder";

export interface PaymentBody {
    transaction_amount: number;
    token:              string;
    installments:       number;
    issuer_id:          string;
    payment_method_id:  string;
    payer:              Payer;
    reserva:            CreateReservaDTO; // Relación con la reserva
}

export interface Payer {
    email:          string;
    identification: Identification;
}
