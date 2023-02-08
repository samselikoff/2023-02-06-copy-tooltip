import { cloneElement, useRef } from "react";
import {
  DismissButton,
  Overlay,
  useOverlayTrigger,
  usePopover,
} from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Button } from "./button";

export default function Page() {
  return <div className="m-8 p-8">hi</div>;
}

function Popover({ children, state, offset = 8, ...props }) {
  let popoverRef = useRef(null);
  let { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className="underlay" />
      <div {...popoverProps} ref={popoverRef} className="popover">
        <svg {...arrowProps} className="arrow" data-placement={placement}>
          <path d="M0 0,L6 6,L12 0" />
        </svg>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

function PopoverTrigger({ label, children, ...props }) {
  let ref = useRef(null);
  let state = useOverlayTriggerState(props);
  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    ref
  );

  return (
    <>
      <Button {...triggerProps} buttonRef={ref}>
        {label}
      </Button>
      {state.isOpen && (
        <Popover {...props} triggerRef={ref} state={state}>
          {cloneElement(children, overlayProps)}
        </Popover>
      )}
    </>
  );
}
