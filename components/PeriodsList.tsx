import * as React from "react";
import { Box, Button } from "@theme-ui/components";
import { Formik, Form } from "formik";

import useCollection, { db } from "../utils/useCollection";
import firebase from "../utils/firebase";
import Datetime from "./Datetime";
import Field from "./Field";

const PeriodsList = ({ uid }) => {
  const [periods, { isLoading }] = useCollection(
    db => db.collection("periods").where("uid", "==", uid),
    [uid]
  );

  const handleSubmit = React.useCallback(async ({ startedAt, endedAt }) => {
    db.collection("periods").add({
      uid,
      startedAt: new Date(startedAt),
      endedAt: new Date(endedAt)
    });
  }, []);

  return (
    <Formik
      initialValues={{ startedAt: "", endedAt: "" }}
      onSubmit={handleSubmit}
    >
      <Form>
        <table>
          <thead>
            <tr>
              <th />
              <th>Start</th>
              <th>End</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {periods.map(periodDoc => {
              const data = periodDoc.data();
              return (
                <tr key={periodDoc.id}>
                  <td />
                  <td>
                    <Datetime timestamp={data.startedAt} />
                  </td>
                  <td>
                    {data.endedAt && <Datetime timestamp={data.endedAt} />}
                  </td>
                  <td />
                </tr>
              );
            })}
            <tr>
              <th>Add new</th>
              <td>
                <Field
                  id="PeriodsList-startedAt"
                  label="Start date"
                  name="startedAt"
                  type="date"
                  required
                />
              </td>
              <td>
                <Field
                  id="PeriodsList-startedAt"
                  label="End date"
                  name="endedAt"
                  type="date"
                />
              </td>
              <td>
                <Button type="submit" variant="primary">
                  +
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Formik>
  );
};

export default PeriodsList;
