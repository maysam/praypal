import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import LocationComponent from './LocationComponent';

export default function DayChooser({ setDay }) {
  return <div className="flex flex-col p-4">
    <div className="flex content-between grow">
      <div className="badge badge-success badge-outline badge-secondary	"> history </div>
      <span>version: 0.0.1</span>
    </div>
    <Button className="btn btn-active">sharii saat</Button>
    <Button onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</Button>
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">ساعت شرعی</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Button>Close</Button>
          </form>
        </div>
      </div>
    </dialog>
    <LocationComponent />
    <Button className="btn btn-active" onClick={() => setDay('2024-01-01')}>diroz</Button>
    <Button variant="contained" className="btn btn-active" onClick={() => setDay('2024-01-02')}>emroz</Button>
    <Button className="btn btn-active" onClick={() => setDay('2024-01-03')}>farda</Button>
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      <Button>diroz</Button>
      <Button variant="contained">emroz</Button>
      <Button>farda</Button>
    </ButtonGroup>
    <Button className="btn btn-active">contact us</Button>
    <Button className="btn btn-active">force update</Button>
    <Button className="btn btn-active">share with friends</Button>
    <Button className="btn btn-active">google sign in button</Button>
    <div>
      total sojood time
      total sojood count
      average sojood time
    </div>
  </div>
}
