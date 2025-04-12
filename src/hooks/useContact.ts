import { useEffect, useState } from "react";
import io from "socket.io-client";
import { findAllContact } from "@/app/(app)/actions/contact";
import { Contact } from "@/models/contact.model";

const API_URL = "https://aniver-lembre-api.vercel.app/";

const socket = io(API_URL, { transports: ["websocket"] });

export function useContact() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoadingContact, setIsLoadingContact] = useState(true);

  useEffect(() => {
    async function loadContacts() {
      const initialContacts = await findAllContact();
      if (Array.isArray(initialContacts)) {
        setContacts(initialContacts);
      }
      setIsLoadingContact(false);
    }

    loadContacts();

    socket.on("contatosAtualizados", (updatedContacts: Contact[]) => {
      setContacts(updatedContacts);
    });

    return () => {
      socket.off("contatosAtualizados");
    };
  }, []);

  return { contacts, isLoadingContact };
}
