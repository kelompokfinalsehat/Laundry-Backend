
export const getAttendanceDateWIB = (date: Date = new Date()): Date => {
  const dateWIB = date.toLocaleDateString("en-CA", {
    timeZone: "Asia/Jakarta",
  });
  return new Date(`${dateWIB}T00:00:00.000Z`);
};
