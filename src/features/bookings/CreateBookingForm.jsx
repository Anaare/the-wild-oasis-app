import { useForm } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import { useGetCabins } from "./useCabins";
import { useGetGuests } from "./useGuests";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
`;

function CreateBookingForm({ onCloseModal }) {
  const { createBooking, isCreating } = useCreateBooking();

  const { data: guests = [], isLoading: isFetching } = useGetGuests();
  const { data: cabins = [], isLoading: isLoadingCabins } = useGetCabins();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const startDate = watch("startDate");

  function formatForSupabase(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // You can optionally set a fixed time if your inputs don’t include it
    const hours = "00";
    const minutes = "00";
    const seconds = "00";

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function onSubmit(data) {
    const formattedStartDate = formatForSupabase(data.startDate);
    const formattedEndDate = formatForSupabase(data.endDate);

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    const numNights = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Milliseconds to days

    const bookingData = {
      ...data,
      guestId: Number(data.guestId),
      cabinId: Number(data.cabinId),
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      numNights,
      totalPrice: Number(data.extrasPrice) + Number(data.cabinPrice),
    };

    console.log(bookingData);
    createBooking(bookingData);
    onCloseModal();
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
            validate: (endDate) =>
              !startDate || new Date(endDate) >= new Date(startDate)
                ? true
                : "End date must be after start date",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Number of nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          {...register("numNights")}
          value={
            watch("startDate") && watch("endDate")
              ? Math.ceil(
                  (new Date(watch("endDate")) - new Date(watch("startDate"))) /
                    (1000 * 60 * 60 * 24)
                )
              : ""
          }
          disabled
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          {...register("cabinPrice", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Extras price" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          id="extrasPrice"
          {...register("extrasPrice", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Total price">
        <Input
          type="number"
          id="totalPrice"
          value={
            Number(watch("extrasPrice") ?? 0) + Number(watch("cabinPrice") ?? 0)
          }
          disabled
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <select
          id="status"
          {...register("status", {
            required: "This field is required",
          })}
          disabled={isCreating}
        >
          <option value="">Select status</option>
          <option value="Unconfirmed">Unconfirmed</option>
          <option value="Checked in">Checked in</option>
          <option value="Checked out">Checked out</option>
        </select>
      </FormRow>

      <FormRow label="Breakfast" error={errors?.hasBreakfast?.message}>
        <div style={{ display: "flex", gap: "1.6rem", alignItems: "center" }}>
          <RadioLabel htmlFor="breakfast-yes">
            <Input
              type="radio"
              value="true"
              id="breakfast-yes"
              {...register("hasBreakfast", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
            Yes
          </RadioLabel>
          <RadioLabel htmlFor="breakfast-no">
            <Input
              type="radio"
              value="false"
              id="breakfast-no"
              {...register("hasBreakfast", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
            No
          </RadioLabel>
        </div>
      </FormRow>

      <FormRow label="Paid" error={errors?.isPaid?.message}>
        <div style={{ display: "flex", gap: "1.6rem", alignItems: "center" }}>
          <RadioLabel htmlFor="paid-yes">
            <Input
              type="radio"
              value="true"
              id="paid-yes"
              {...register("isPaid", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
            Yes
          </RadioLabel>
          <RadioLabel htmlFor="paid-no">
            <Input
              type="radio"
              value="false"
              id="paid-no"
              {...register("isPaid", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
            No
          </RadioLabel>
        </div>
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <textarea
          id="observations"
          {...register("observations")}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Guest" error={errors?.guestId?.message}>
        <select
          id="guestId"
          {...register("guestId", { required: "This field is required" })}
          disabled={isFetching}
        >
          <option value="">Select a guest</option>
          {guests.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.fullName} ({guest.email})
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Cabin" error={errors?.cabinId?.message}>
        <select
          id="cabinId"
          {...register("cabinId", { required: "This field is required" })}
          disabled={isLoadingCabins}
        >
          <option value="">Select a cabin</option>
          {cabins.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              Cabin #{cabin.name}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button>Create new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
