import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from '../../services/hooks/useForm';
import { useSelection } from '../../services/hooks/useSelection';
import type { Tag } from '../../pages/Products/types';
import { Modal } from './Modal';
import { ChangeHandler } from '../../services/types/helpers';
import { productService } from '../../services/productService';
import { shopService } from '../../services/shopService';
import { Checkbox } from '@mui/material';
import produce from 'immer';

interface Props {
  editType: 'add' | 'remove' | undefined;
  onSubmit: (tags: Tag[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface TagWithSelection extends Tag {
  isSelected: boolean;
}

const withIsSelectedProperty = (obj: Record<string, any>) => ({
  ...obj,
  isSelected: false,
});

export const EditTagsModal: React.FC<Props> = ({
  onSubmit,
  editType,
  isOpen,
  onClose,
}) => {
  const [term, setTerm] = useState('');
  const [tagsPool, setTagsPool] = useState<TagWithSelection[]>([]);
  const [filteredTags, setFilteredTags] = useState<TagWithSelection[]>([]);

  useEffect(() => {
    (async () => {
      const res = await productService.getTags();
      const tags = res.map(
        (tag) => withIsSelectedProperty(tag) as TagWithSelection
      );
      setTagsPool(tags);
      setFilteredTags(tags);
    })();
  }, []);

  const handleChange: ChangeHandler = (ev) => {
    setTerm(ev.target.value);
    const regex = new RegExp(ev.target.value, 'i');
    setFilteredTags(tagsPool.filter((tag) => regex.test(tag.title)));
  };

  const newTagsAdded = useMemo(() => {
    return filteredTags.filter((tag) => !tag.id && tag.isSelected);
  }, [filteredTags]);

  const existingTagsAdded = useMemo(() => {
    return filteredTags.filter((tag) => !!tag.id && tag.isSelected);
  }, [filteredTags]);

  const availableTags = useMemo(() => {
    return filteredTags.filter((tag) => !tag.isSelected);
  }, [filteredTags]);

  const handleCreatedTagToggle = (tag: TagWithSelection) => {
    const updatedFilters = [...filteredTags];
    if (tag.isSelected) {
      updatedFilters.splice(
        updatedFilters.findIndex(({ title }) => title === tag.title)
      );
      setFilteredTags(updatedFilters);
    }
  };

  const onSelectTag = (toggledTag: TagWithSelection) => {
    if (!toggledTag.id) return handleCreatedTagToggle(toggledTag);
    setFilteredTags(
      produce((filteredTags) => {
        filteredTags.forEach((tag) => {
          if (tag.id === toggledTag.id) tag.isSelected = !toggledTag.isSelected;
        });
      })
    );
  };

  return (
    <Modal isOpen={isOpen} onCancel={onClose}>
      <div className="tags-edit-modal">
        <div className="search-container flex column">
          <input
            type="text"
            name="tagName"
            value={term}
            onChange={handleChange}
            placeholder="Search fot tags..."
          />
        </div>
        <hr />
        <div className="tags-pool">
          {/* Move them to be cleaner they are repeating */}
          {newTagsAdded.length && (
            <div>
              <h4>Added New Tags</h4>
              {newTagsAdded.map((tag) => (
                <div className="flex">
                  <Checkbox
                    checked
                    value={tag.title}
                    onSelect={(ev) => onSelectTag(tag)}
                  />
                  {tag.title}
                </div>
              ))}
            </div>
          )}
          {existingTagsAdded.length && (
            <div>
              <h4>Added Tags</h4>
              {existingTagsAdded.map((tag) => (
                <div className="flex">
                  <Checkbox
                    checked
                    value={tag.id}
                    onSelect={(ev) => onSelectTag(tag)}
                  />
                  {tag.title}
                </div>
              ))}
            </div>
          )}
          {availableTags.length && (
            <>
              <h4>Available tags</h4>
              {availableTags.map((tag) => (
                <div className="flex">
                  <Checkbox
                    checked
                    value={tag.id}
                    onSelect={(ev) => onSelectTag(tag)}
                  />
                  {tag.title}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
