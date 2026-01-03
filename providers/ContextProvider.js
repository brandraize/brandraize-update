"use client";
import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { db } from "@/configuration/firebase-config";
import {
  doc,
  onSnapshot,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import useAuth from "@/hooks/UseAuth";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({ name: "My Name" });
  const [categories, setCategories] = useState({
    en: [],
    ar: [],
  });
  const [products, setProducts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [articles, setArticles] = useState([]);

  const userId = user?.uid;

  useEffect(() => {
    if (userId) {
      const docRef = doc(db, "users", userId);
      const unsubscribe = onSnapshot(
        docRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setProfileData(data);
          } else {
            console.log("Data does not exist");
          }
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );
      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "contacts"), (snapshot) => {
      const fetchedItems = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setContacts(fetchedItems);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "admins"), (snapshot) => {
      const fetchedAdmins = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAdmins(fetchedAdmins);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const docRef = doc(db, "general", "categories");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCategories(docSnap.data().categories || {});
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const fetchedProducts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(fetchedProducts);
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "articles"),
      (snapshot) => {
        const fetchedArticles = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setArticles(fetchedArticles);
      },
      (error) => {
        console.error("Error fetching articles:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider
      value={{
        profileData,
        categories,
        products,
        contacts,
        admins,
        articles,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
