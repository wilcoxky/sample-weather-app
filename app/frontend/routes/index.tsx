import React, { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [search, setSearch] = useState("");
  const [searchEntered, setSearchEntered] = useState("");
  const searchDebounced = useDebounce([search], 1000);
  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", searchDebounced],
    queryFn: async () =>
      await fetch(`/weather?search=${searchDebounced}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    enabled: !isEmpty(searchEntered),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/weather?search=${searchEntered}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 text-primary">
        Simple Weather App
      </h1>
      <div className="flex flex-row justify-center items-center space-x-4 w-full">
        <div className="flex flex-col w-full max-w-3xl">
          <input
            type="text"
            placeholder="Enter Address or Zip Code"
            className={clsx("input input-bordered", error && "input-error")}
          />
          {error && (
            <label className="text-red-500 input-error ml-2">
              {"Sample Error message"}
            </label>
          )}
        </div>

        <button onClick={onSubmit} className="btn btn-primary">
          Search
        </button>
      </div>
    </div>
  );
}
