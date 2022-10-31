import { EditTwoTone } from '@mui/icons-material';
import React, { useState } from 'react';
import { ActionsBar } from '../../../cmps/ActionsBar';
import { EditTagsModal } from '../../../cmps/Dialogs/EdtTagsModal';
import { Status } from '../../../services/types/general';
import { Tag } from '../types';

interface Props {
  selectedProductIds: string[];
  toggleProductSelection: () => void;
}
export const ProductViewActions: React.FC<Props> = ({
  selectedProductIds,
  toggleProductSelection,
}) => {
  // useModal to trigger confirmation.
  const [modalInfo, setModalInfo] =
    useState<{ id: 'tags' | 'collections'; action: 'add' | 'remove' } | null>(
      null
    );

  const onChangeStatus = (status: Status) => {};

  const onDeleteProducts = () => {};

  const onOpenTagsModal = (action: 'remove' | 'add') => {
    setModalInfo({ id: 'tags', action });
  };

  const onAddTags = (tags: Tag[]) => {};

  const onDeletTags = (tags: Tag[]) => {};

  const onOpenCollectionsModal = (action: 'add' | 'remove') => {};

  const onAddToCollections = (collectionIds: string[]) => {};

  const onRemoveFromCollections = (collectionIds: string[]) => {};

  return (
    <>
      <div>
        {
          <ActionsBar
            actions={[
              {
                title: `${selectedProductIds.length} selected`,
                onClick: toggleProductSelection,
              },
              {
                title: 'Set as active',
                onClick: () => onChangeStatus('active'),
              },
              { title: 'Set as draft', onClick: () => onChangeStatus('draft') },
              {
                title: 'Archive products',
                onClick: () => onChangeStatus('archive'),
              },
              { title: 'Delete Products', onClick: onDeleteProducts },
              { title: 'Add tags', onClick: () => onOpenTagsModal('add') },
              {
                title: 'Remove tags',
                onClick: () => onOpenTagsModal('remove'),
              },
              {
                title: 'Add to collections',
                onClick: () => onOpenCollectionsModal('add'),
              },
              {
                title: 'Remove from collections',
                onClick: () => onOpenCollectionsModal('remove'),
              },
            ]}
          />
        }
      </div>
      <EditTagsModal
        isOpen={modalInfo?.id === 'tags'}
        editType={modalInfo?.action}
        onClose={() => setModalInfo(null)}
        onSubmit={modalInfo?.action === 'add' ? onAddTags : onDeletTags}
      />
    </>
  );
};
