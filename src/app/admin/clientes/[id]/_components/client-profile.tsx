// Components
import { Card, CardContent } from "@/components/ui/card";

// Services
import { type Client } from "@/services/clients/clients.props";

// DTOs
interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface Address {
  id: string;
  street: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface ClientProfileProps {
  client: Client & {
    contacts?: Contact[];
    addresses?: Address[];
  };
}

const ClientProfile = ({ client }: ClientProfileProps) => {
  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {client.email ?? "-"}
          </p>
          <p>
            <strong>Telefone:</strong> {client.phone ?? "-"}
          </p>
          <p>
            <strong>Website:</strong> {client.website ?? "-"}
          </p>
          <p>
            <strong>Notas:</strong> {client.notes ?? "-"}
          </p>
        </div>
        {client.contacts?.length ? (
          <div className="space-y-2">
            <h4 className="font-semibold">Contatos</h4>
            <ul className="list-disc space-y-1 pl-4">
              {client.contacts.map((contact) => (
                <li key={contact.id}>
                  {contact.name}
                  {contact.email ? ` - ${contact.email}` : ""}
                  {contact.phone ? ` - ${contact.phone}` : ""}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {client.addresses?.length ? (
          <div className="space-y-2">
            <h4 className="font-semibold">Endereços</h4>
            <ul className="list-disc space-y-1 pl-4">
              {client.addresses.map((address) => (
                <li key={address.id}>
                  {address.street}
                  {address.city ? `, ${address.city}` : ""}
                  {address.state ? ` - ${address.state}` : ""}
                  {address.zipCode ? `, ${address.zipCode}` : ""}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ClientProfile;

