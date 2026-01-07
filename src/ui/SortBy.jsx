import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchparams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchparams(searchParams);
  }

  return (
    <Select
      value={sortBy}
      type="white"
      options={options}
      onChange={handleChange}
    />
  );
}

export default SortBy;
