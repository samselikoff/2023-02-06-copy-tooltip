import { motion, useAnimationControls } from "framer-motion";
import { forwardRef, ReactNode, useRef } from "react";
import { FocusRing, useButton } from "react-aria";

export default forwardRef(function Button(
  {
    children,
    ...rest
  }: {
    children: ReactNode;
  },
  ref
) {
  let controls = useAnimationControls();

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

  return (
    <FocusRing focusRingClass="ring ring-offset-2 ring-offset-black">
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
