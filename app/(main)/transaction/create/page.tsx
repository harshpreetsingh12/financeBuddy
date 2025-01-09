import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import React, { useEffect, useState } from "react";
import AddTransactionForm from "../_components/AddTransactionForm";
import { getTransaction } from "@/actions/transaction";


type TXParamType = {
  id: string;
};

type TransactionCreateeProps = {
  searchParams: Promise<TXParamType>;
};

const AddTransactionPage = async ({ searchParams }:TransactionCreateeProps) => {
  const resolved= await searchParams
  const editId = resolved.edit;
  const accounts = await getUserAccounts();
  
  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <h1 className="text-4xl gradient-title mb-8">
        {editId ? "Edit" : "Add"} Transactions
      </h1>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
};

export default AddTransactionPage;
