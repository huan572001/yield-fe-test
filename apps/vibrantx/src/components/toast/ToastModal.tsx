import { CheckCircleFilled, Close, right } from "@/assets/home";
import { Box } from "@chakra-ui/react";
import SVG from "react-inlinesvg";
export const ToastModal = ({ toast, title, content, link }: any) => {
  return (
    <Box
      color="white"
      p={5}
      margin="16px"
      className="bg-white rounded-lg shadow-3xl flex justify-between gap-4"
    >
      <SVG src={CheckCircleFilled} width={24} height={24} />
      <Box className="grid gap-1">
        <Box className="flex justify-between w-[250px]">
          <Box className="text-start text-neutralGray-600 text-base font-normal leading-normal">
            {title}
          </Box>
          <SVG
            src={Close}
            width={14}
            height={14}
            className="!text-blue-800 cursor-pointer"
            onClick={() => toast.closeAll()}
          />
        </Box>

        <Box className="flex justify-end gap-1 items-center">
          <a
            href={link}
            target="_blank"
            className="text-center text-blue-600 text-xs font-medium leading-none"
          >
            {content}
          </a>
          <SVG src={right} width={16} height={16} />
        </Box>
      </Box>
    </Box>
  );
};
