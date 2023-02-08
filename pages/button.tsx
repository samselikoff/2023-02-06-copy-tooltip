import { motion, useAnimationControls } from "framer-motion";
import { forwardRef, ReactNode, useRef } from "react";
import { FocusRing, useButton } from "react-aria";

export default function Page() {
  return (
    <div className="m-10 border p-10">
      <Button>Click</Button>
    </div>
  );
}

export const Button = forwardRef(function Button(
  {
    // onClick = () => {},
    children,
    ...rest
  }: {
    // onClick?: () => void;
    children: ReactNode;
  },
  ref
) {
  // let ref = useRef(null);
  let controls = useAnimationControls();
  console.log(ref);

  let { buttonProps } = useButton(
    {
      onPressStart: () => {
        controls.stop();
        controls.set({ background: "#757376" });
      },
      onPressEnd: () => {
        controls.start({
          background: "#353336",
          transition: { duration: 0.4 },
        });
      },
      onPress: (e) => {
        rest.onClick(e);
        controls.start({
          background: [null, "#353336"],
          transition: { duration: 0.4 },
        });
      },
    },
    ref
  );
  // return <button ref={ref}>hi</button>;

  // return (
  //   <button
  //     // {...buttonProps}
  //     {...rest}
  //     {...buttonProps}
  //     ref={ref}
  //     // animate={controls}
  //     className="h-20 w-20 touch-none select-none rounded-full bg-[#353336] text-white focus:outline-none"
  //     style={{
  //       WebkitTapHighlightColor: "transparent",
  //     }}
  //   >
  //     {children}
  //   </button>
  // );

  return (
    <FocusRing focusRingClass="ring ring-offset-2 ring-offset-black">
      {/* <button
        {...buttonProps}
        {...rest}
        ref={ref}
        // animate={controls}
        className="h-20 w-20 touch-none select-none rounded-full bg-[#353336] text-white focus:outline-none"
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {children}
      </button> */}
      <motion.button
        {...rest}
        {...buttonProps}
        ref={ref}
        animate={controls}
        className="h-20 w-20 touch-none select-none rounded-full bg-[#353336] text-white focus:outline-none"
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {children}
      </motion.button>
    </FocusRing>
  );
});
