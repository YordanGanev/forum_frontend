import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconAccent({
  icon,
  text,
  ...props
}: {
  icon: IconDefinition;
  text: string;
}) {
  return (
    <div className="flex items-center gap-1 text-gray-600" {...props}>
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
}
