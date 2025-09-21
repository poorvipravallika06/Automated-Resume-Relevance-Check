/**
 * Collection ID: learningresources
 * Interface for LearningResources
 */
export interface LearningResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  resourceLink?: string;
  /** @wixFieldType text */
  skillCovered?: string;
  /** @wixFieldType text */
  resourceType?: string;
  /** @wixFieldType text */
  difficultyLevel?: string;
}
