import React from "react";
import Formpage from "@/components/Form";

// Some imported components may have an inaccurate type (e.g. typed as () => void).
// Coerce to a React component type so it can be used in JSX here without changing other files.
const FormpageComponent = Formpage as unknown as React.ComponentType<any>;

export default function Page() {
  return (
    <>
      <FormpageComponent />
    </>
  );
}
