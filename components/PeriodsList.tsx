import { Box } from "theme-ui";

import useCollection from "../utils/useCollection";
import Datetime from "./Datetime";

const PeriodsList = ({ uid }) => {
  const [periods, { isLoading }] = useCollection(
    db => db.collection("periods").where("uid", "==", uid),
    [uid]
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Start</th>
          <th>End</th>
        </tr>
      </thead>
      <tbody>
        {periods.map(periodDoc => {
          const data = periodDoc.data();
          return (
            <tr key={periodDoc.id}>
              <td>
                <Datetime timestamp={data.started_at} />
              </td>
              <td>
                <Datetime timestamp={data.ended_at} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeriodsList;
