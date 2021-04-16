import React, { memo, useCallback } from "react";
import Link from "next/link";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("ja", ja);

const rules = {
  noSpcChar: (v) => {
    const isInvalid = /\W/g.test(v);
    return (isInvalid && "No Special Character allowed") || undefined;
  }
};

export default memo(function IndexPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  const onSubmit = useCallback((data) => {
    debugger;
    console.log(data);
  }, []);

  console.log(errors);
  return (
    <div>
      Hello World{" "}
      <Link href="/about">
        <a>About</a>
      </Link>
      <h1>React Hook Form example</h1>
      <div className="main-form">
        Check Your Information
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="field">
              <input
                type="text"
                {...register("firstName", {
                  required: true,
                  validate: { ...rules }
                })}
              />
              <label>First Name</label>
              {errors.lastName && (
                <p className="error">{errors.firstName.message}</p>
              )}
            </div>
            <div className="field">
              <input
                type="text"
                {...register("lastName", {
                  required: "Last Name is Required"
                })}
              />
              <label>Last Name</label>
              {errors.lastName && (
                <p className="error">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="field">
              <input
                type="number"
                {...register("age", { min: 18, max: 99, required: true })}
              />
              <label>Age</label>
              {errors.age && (
                <p className="error">Please provide valide age.</p>
              )}
            </div>
            <div className="field">
              <Controller
                name="dob"
                control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState
                }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    popperPlacement="top-end"
                    locale="ja"
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
});
