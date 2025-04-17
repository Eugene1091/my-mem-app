import React from "react";
import Navbar from "@/components/Navbar";

const Page = () => {
  return (
    <div>
      <Navbar />
      <main className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Вітаю. Це мій мем застосунок</h1>
      </main>
    </div>
  );
};

export default Page;