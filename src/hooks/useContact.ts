import { useEffect, useState } from "react";
import io from "socket.io-client";
import { findAllContact } from "@/app/(app)/actions/contact";
import { Contact } from "@/models/contact.model";

const API_URL = "http://localhost:4444";
const socket = io(API_URL, { transports: ["websocket"] });

export function useContact() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContacts() {
      const initialContacts = await findAllContact();
      if (Array.isArray(initialContacts)) {
        setContacts(initialContacts);
      }
      setLoading(false);
    }

    loadContacts();

    socket.on("contatosAtualizados", (updatedContacts: Contact[]) => {
      console.log("🚀 Contatos atualizados via WebSocket:", updatedContacts);
      setContacts(updatedContacts);
    });

    return () => {
      socket.off("contatosAtualizados");
    };
  }, []);

  return { contacts, loading };
}
