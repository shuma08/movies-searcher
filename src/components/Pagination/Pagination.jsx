import React from "react";
import { Pagination} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./styles.scss";

const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#ffff'
    },
		text: {
			primary: '#ffff'
		}
  },
});
const CustomPagination = ({setPage, numOfPages = 10}) => {
    const hadlePageChange = (page) => {
        setPage(page)
        window.scroll(0,0)
    }

    return (
			<ThemeProvider theme={outerTheme}>
				<Pagination
          count={numOfPages}
					onChange={(e)=> hadlePageChange(e.target.textContent)}
					color="primary"
				/>
			</ThemeProvider>
        
    )

} 

export default CustomPagination;