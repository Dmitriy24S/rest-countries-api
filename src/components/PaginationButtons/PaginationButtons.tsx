import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

type PaginationButtonsProps = {
  pageCount: number;
  pageNumber: number;
  handlePaginationChange: (event: any, value: number) => void;
};

const PaginationButtons = ({
  pageCount,
  pageNumber,
  handlePaginationChange,
}: PaginationButtonsProps) => {
  return (
    <Stack spacing={2}>
      <Pagination
        showFirstButton
        showLastButton
        siblingCount={1}
        count={pageCount}
        onChange={handlePaginationChange}
        page={pageNumber}
        boundaryCount={1}
      />
    </Stack>
  );
};

export default PaginationButtons;
