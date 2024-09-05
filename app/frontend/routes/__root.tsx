import React from "react";
import { Outlet, Link, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

{
  /* <Link to="/" className="text-blue-600 hover:text-blue-800">
  <button className="btn btn-primary">Home</button>
</Link>; */
}
function RootComponent() {
  return (
    <div className="h-screen w-screen">
      <header className=""></header>
      <main className="">
        <Outlet />
      </main>
      <footer className=""></footer>
    </div>
  );
}
