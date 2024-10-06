import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default ({ title, children }: any) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
        {title || 'Check example code'}
      </AccordionSummary>
      <AccordionDetails color="red" sx={{ bgcolor: '#333', p: 1 }}>
        <pre
          style={{
            color: '#fff',
            backgroundColor: '#333',
            padding: '8px',
            borderRadius: '4px',
            marginTop: '8px',
          }}
          contentEditable
        >
          {children}
        </pre>
      </AccordionDetails>
    </Accordion>
  );
};
