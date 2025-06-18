import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton>
            <Button
              className="border bg-black text-white shadow-2xl hover:scale-105 hover:cursor-pointer"
              variant={"default"}
            >
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  );
}

export default App;
