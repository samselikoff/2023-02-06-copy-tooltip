import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
// import { Button } from "./button";

export default function Index() {
  let [open, setOpen] = useState(false);
  // let ref = useRef();
  // useEffect(() => {
  //   console.log(ref);
  // });
  // console.log(ref);

  // return <Button>hi</Button>;

  return (
    <div className="m-8 border p-8">
      {/* <button className="bg-gray-300 px-3 py-1">Click me</button> */}
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          asChild
          className="hover:text-gray-400 focus:outline-none"
        >
          {/* <ClipboardIcon className="W-4 h-4" /> */}
          <Button>Click me</Button>
          {/* <button>hi</button> */}
        </Popover.Trigger>

        <AnimatePresence>
          {open && (
            <Popover.Portal forceMount>
              <Popover.Content
                className=""
                sideOffset={5}
                side="right"
                asChild
                align="center"
              >
                <motion.div
                  initial="hidden"
                  animate="showing"
                  exit="hidden"
                  transition={{ duration: 0.2 }}
                  variants={{
                    hidden: {
                      y: 3,
                      opacity: 0,
                    },
                    showing: {
                      y: 0,
                      opacity: 1,
                    },
                  }}
                  className="focus:outline-none"
                >
                  <div className="rounded border border-white/20 bg-gray-800 py-1.5 px-4 text-sm font-semibold text-gray-400 shadow">
                    Copied!
                  </div>
                  <Popover.Arrow className="fill-white/20" />
                </motion.div>
              </Popover.Content>
            </Popover.Portal>
          )}
        </AnimatePresence>
      </Popover.Root>
    </div>
  );
}

const Button = forwardRef(function Button(
  { children }: { children: ReactNode },
  ref
) {
  // console.log(ref);

  useEffect(() => {
    console.log(ref);
  });

  return (
    <button className="foo" ref={ref}>
      {children}
    </button>
  );
});
