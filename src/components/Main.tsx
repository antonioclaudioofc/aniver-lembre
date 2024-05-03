"use client";

import EventCard from "./EventCard";
import { Event } from "@/model/EventModel";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function Main() {
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const collectionRef = collection(db, "eventos");
      const eventCollectionSnapshot = await getDocs(collectionRef);
      const list = eventCollectionSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Event;
      });

      setEventList(list);
    };

    fetchEvents();
  }, []);

  return (
    <section className="flex items-center justify-center gap-8 flex-wrap mx-24 my-6 max-xl:m-2">
      {eventList.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}
