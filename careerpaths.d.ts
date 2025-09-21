/**
 * Collection ID: careerpaths
 * Interface for CareerPaths
 */
export interface CareerPaths {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  domainName?: string;
  /** @wixFieldType image */
  flowchart?: string;
  /** @wixFieldType text */
  methodologies?: string;
  /** @wixFieldType text */
  workflows?: string;
  /** @wixFieldType text */
  timelines?: string;
  /** @wixFieldType text */
  careerScope?: string;
}
