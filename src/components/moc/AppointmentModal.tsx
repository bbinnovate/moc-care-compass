import * as Dialog from "@radix-ui/react-dialog";
import { createContext, useContext, useState, type ReactNode, type FormEvent } from "react";
import { X, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { centres } from "@/data/content";

type Ctx = { open: (centre?: string, doctor?: string) => void };
const AppointmentCtx = createContext<Ctx>({ open: () => {} });
export const useAppointment = () => useContext(AppointmentCtx);

type Errors = Partial<Record<"name" | "phone" | "location", string>>;

export function validateEnquiry(v: { name: string; phone: string; location: string }): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter the patient or caregiver's name.";
  if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!v.location) e.location = "Choose a preferred centre.";
  return e;
}

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [doctor, setDoctor] = useState<string | undefined>();
  const [values, setValues] = useState({ name: "", phone: "", location: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});

  const open = (centre?: string, chosenDoctor?: string) => {
    setDoctor(chosenDoctor);
    setDone(false);
    setErrors({});
    setValues((v) => ({ ...v, location: centre ?? v.location }));
    setOpen(true);
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validateEnquiry(values);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // DEMO ONLY: nothing is sent or stored.
      setDone(true);
      setValues({ name: "", phone: "", location: "", message: "" });
    }
  };

  const field = "mt-1.5 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-[15px] outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

  return (
    <AppointmentCtx.Provider value={{ open }}>
      {children}
      <Dialog.Root open={isOpen} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[92vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-background p-6 shadow-lift data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 md:p-8">
            <Dialog.Close asChild><Button variant="ghost" size="icon" className="absolute right-4 top-4" aria-label="Close"><X /></Button></Dialog.Close>
            {done ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden />
                <Dialog.Title className="mt-4 text-2xl">Thank you for reaching out.</Dialog.Title>
                <Dialog.Description asChild>
                  <p className="mt-3 text-muted-foreground">
                    Our care team will review your enquiry and contact you promptly to schedule your appointment.
                  </p>
                </Dialog.Description>
                <Dialog.Close asChild><Button className="mt-6">Close</Button></Dialog.Close>
              </div>
            ) : (
              <>
                <p className="eyebrow">Request an appointment</p>
                <Dialog.Title className="mt-2 text-[28px] leading-tight">Tell us how to reach you</Dialog.Title>
                <Dialog.Description className="mt-2 text-[15px] text-muted-foreground">
                  Our team will help you find the right specialist and schedule a convenient time.
                </Dialog.Description>
                {doctor && <p className="mt-4 border-l-2 border-primary pl-3 text-sm text-ink">Selected specialist: <strong>{doctor}</strong></p>}
                <form onSubmit={submit} noValidate className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="f-name" className="text-sm font-medium">Full name</label>
                    <input id="f-name" className={field} value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} autoComplete="name" />
                    {errors.name && <p id="e-name" className="mt-1 text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-phone" className="text-sm font-medium">Mobile number</label>
                    <input id="f-phone" type="tel" inputMode="tel" className={field} value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} placeholder="98XXXXXXXX" autoComplete="tel" />
                    {errors.phone && <p id="e-phone" className="mt-1 text-sm text-destructive">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-loc" className="text-sm font-medium">Preferred centre</label>
                    <select id="f-loc" className={field} value={values.location} onChange={(e) => setValues({ ...values, location: e.target.value })} aria-invalid={!!errors.location} aria-describedby={errors.location ? "e-loc" : undefined}>
                      <option value="">Select a centre</option>
                      <option value="Not sure">Not sure — please advise</option>
                      {centres.map((c) => (
                        <option key={c.name} value={c.name}>{c.name}, {c.city}</option>
                      ))}
                    </select>
                    {errors.location && <p id="e-loc" className="mt-1 text-sm text-destructive">{errors.location}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-msg" className="text-sm font-medium">Message <span className="font-normal text-muted-foreground">(optional)</span></label>
                    <textarea id="f-msg" rows={3} className={field} value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} placeholder="Anything you'd like us to know" />
                  </div>
                  <Button type="submit" className="w-full">Request a call back</Button>
                </form>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </AppointmentCtx.Provider>
  );
}
