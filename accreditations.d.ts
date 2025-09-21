/**
 * Collection ID: accreditations
 * Interface for Accreditations
 */
export interface Accreditations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType image */
  badgeImage?: string;
  /** @wixFieldType text */
  earningCriteria?: string;
  /** @wixFieldType text */
  accreditationType?: string;
  /** @wixFieldType text */
  description?: string;
}
