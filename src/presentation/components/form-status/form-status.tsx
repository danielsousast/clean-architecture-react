import React, { useContext } from "react";

import Context from "@/presentation/contexts/form/form-context";

export default function FormStatus() {
  const { loading, error } = useContext(Context);

  return (
    <div data-testid="error-wrap">
      {loading && <span>Loading...</span>}
      {error && <span>{error}</span>}
    </div>
  );
}
