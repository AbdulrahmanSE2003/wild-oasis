import { useCabins } from "./useCabins";

import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  // 1) Filtering Data
  const filteredValue = searchParams.get("discount") || "all";

  const filteredCabins =
    cabins?.filter((cabin) => {
      if (filteredValue === "all") return true;
      if (filteredValue === "with-discount") return cabin.discount > 0;
      if (filteredValue === "no-discount") return cabin.discount === 0;
    }) || [];
  // ================================================

  // 2) Sorting Data
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const sortedCabins = filteredCabins.sort((a, b) => a[field] - b[field]);
  if (direction === "desc") sortedCabins.reverse();
  // ================================================

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Image</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
