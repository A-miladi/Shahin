export type PaymentGateway = "zarinpal" | "saman" | "mellat" | "parsian";

export interface GatewayInfo {
  id: PaymentGateway;
  name: string;
  pName: string;
  logo: string;
  color: string;
}
