import { MercadoPagoConfig } from 'mercadopago/dist/mercadoPagoConfig';
import type { Config } from 'mercadopago/dist/types';

const config: Config = {
  accessToken: 'TEST-5456723910567615-110411-fb6d6bc8fb0c5dbf7be728a1e923b2ca-1741789467',
  options: {
    timeout: 5000, // Opcional: Configura un tiempo de espera para las solicitudes
  },
};

const mercadoPagoInstance = new MercadoPagoConfig(config);

// Ahora puedes usar mercadoPagoInstance con tu configuración.
console.log(mercadoPagoInstance.accessToken); // Verifica que el token se haya configurado
