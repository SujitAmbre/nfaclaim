import { Tooltip } from 'react-tooltip';
const InfoBubble = ({dataId, content}) => {

    return(
        <>
        {
          (dataId === 'manufacturer_id') ?  <i className="bi bi-info-circle" data-tooltip-id={dataId} data-tooltip-content={content} data-tooltip-variant="warning"></i> :
          <i className="bi bi-info-circle" data-tooltip-id={dataId} data-tooltip-content={`${content} is required`} data-tooltip-variant="warning"></i>
        }
      
      <Tooltip id={dataId} />
        </>
    )
}
export default InfoBubble;