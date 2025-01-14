import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  ActionGroup,
  Button,
  Modal,
  ModalVariant,
} from '@patternfly/react-core';

import { updateRequest } from '@ducks/lab/cluster/actions';
import { AuthorizedFunction } from '@services/user';

interface Props {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const ClusterExtendReservation: React.FC<Props> = ({
  id,
  isOpen,
  onClose,
}: Props) => {
  const dispatch = useDispatch();
  const [extendAmount, setExtendAmount] = useState(1);
  const [expDate, setExpDate] = useState('');

  const admin = AuthorizedFunction(['rhub-admin', 'lab-owner']);

  if (id <= 0) {
    /** TODO: render error when ID is invalid */
    return <></>;
  }

  /** returns days and time of expiration to the UI */
  const getExpDates = (days: number) => {
    const today = new Date();
    today.setTime(today.getTime() + 86400000);
    today.setUTCHours(0, 0, 0, 0);
    return new Date(today.getTime() + days * 86400000).toLocaleString();
  };

  const handleExtendAmount = (value: string) => {
    setExpDate(new Date(getExpDates(Number(value))).toISOString());
    setExtendAmount(Number(value));
  };

  const options = [
    {
      value: 1,
      label: `1 - Will expire on: ${getExpDates(1)}`,
    },
    {
      value: 3,
      label: `3 - Will expire on: ${getExpDates(3)}`,
    },
    {
      value: 7,
      label: `7 - Will expire on: ${getExpDates(7)}`,
    },
  ];

  if (admin) {
    options.unshift({ value: 0, label: 'unlimited' });
  }

  const submitClick = () => {
    const savePayload = {
      reservation_expiration: expDate,
    };
    dispatch(updateRequest(id, savePayload));
  };

  const footer = (
    <ActionGroup>
      <Button variant="primary" onClick={submitClick}>
        Save
      </Button>
      <Button variant="link" onClick={onClose}>
        Cancel
      </Button>
    </ActionGroup>
  );
  return (
    <Modal
      title="Reservation extension"
      variant={ModalVariant.medium}
      isOpen={isOpen}
      onClose={onClose}
      footer={footer}
    >
      <Form>
        <FormGroup
          label="# of days to extend the Reservation:"
          isRequired
          fieldId="cluster-reservation-extension"
          helperText="Please select number of days"
        >
          <FormSelect
            isRequired
            id="extend-amount"
            name="extend-amount"
            aria-describedby="extend-amount-helper"
            value={extendAmount}
            onChange={handleExtendAmount}
            data-testid="extendAmountSelect"
          >
            {options.map((option) => (
              <FormSelectOption
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </FormSelect>
        </FormGroup>
      </Form>
    </Modal>
  );
};

export default ClusterExtendReservation;
