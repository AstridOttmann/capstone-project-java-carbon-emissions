import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionComponent() {
    return (
        <div>
            <Accordion sx={{backgroundColor: "#454C5A", color: "#3fd44d" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Save Co2-Bonus</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Click on the variant you use and save the bonus to your account
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}