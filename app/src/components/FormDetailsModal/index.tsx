import { useFormByIdQuery } from 'src/graphql/generated/graphql';
import { useGenerateNFT } from 'src/hooks/useGenerateNFT';
import Modal from '../Modal';
import { FormDetailsModalBody } from './FormDetailsModalBody';
import { FormDetailsModalFooter } from './FormDetailsModalFooter';

type FormDetailsModalProps = {
  formId: string;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export const FormDetailsModal: React.FC<FormDetailsModalProps> = ({
  formId,
  isModalOpen,
  setModalOpen,
}) => {
  const { handleFormAudit } = useGenerateNFT(formId);
  const { data, loading } = useFormByIdQuery({
    variables: {
      FORM_ID: formId,
    },
  });

  const form = data?.form;

  return (
    <Modal
      isOpen={isModalOpen}
      onCloseModal={() => setModalOpen(false)}
      title={`Form #${formId}`}
      content={<FormDetailsModalBody formData={data} isLoading={loading} />}
      footer={
        <FormDetailsModalFooter
          onFormAudit={handleFormAudit}
          formId={formId}
          isFormAuthorizedByAdmin={form?.isFormAuthorizedByAdmin!}
          isLoading={loading}
        />
      }
    />
  );
};
