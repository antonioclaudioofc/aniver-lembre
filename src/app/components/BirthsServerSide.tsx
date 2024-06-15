"use server";

import React from "react";
import { GetServerSideProps } from "next";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { firestore } from "@/services/firestore.service";
import BirthCard from "./BirthCard";

interface Props {
  initialData: { id: string; data: DocumentData }[];
}

export default function BirthsServerSide(props: Props) {
  return <BirthCard initialData={props.initialData} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const querySnapshot = await getDocs(collection(firestore, "births"));
  const initialData: { id: string; data: DocumentData }[] = [];
  querySnapshot.forEach((doc) => {
    initialData.push({ id: doc.id, data: doc.data() });
  });

  return {
    props: {
      initialData,
    },
  };
};
