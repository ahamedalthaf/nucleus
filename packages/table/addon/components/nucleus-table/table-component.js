import {
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { action, computed, set } from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';
import layout from "../../templates/components/nucleus-table/table-component";
import Table from 'ember-light-table';

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-table/table-component)

  @class Table Component
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('')
class TableComponent extends Component {

  model=null;

  @defaultProp
  canFilter=true;
  /**
  * selectedColumns
  *
  * @field selectedColumns
  * @type function
  * @private
  */
  @computed("columns", {
  get() {
    let arrayFirst = A([{ name: '', valuePath: '', selected: true, disabled: false}]);
    return arrayFirst.concat(this.columns.filterBy('selected'));
  },
  set(key, value) { // eslint-disable-line no-unused-vars
    let arrayFirst = A([{ name: '', valuePath: '', selected: true, disabled: false}]);
    return arrayFirst.concat(value);
  }
  })
  selectedColumns;

  @computed("selectedColumns", "pageItems", {
    get() {
      return this.pageItems;
    }
  })
  rows;

  @defaultProp
  selectAll=false;

  @computed("selectAll", {
    get() {
      console.log("in get")
      console.log(this.selectAll);
      if (this.selectAll) {
        return this.rows;
      }
      else {
        return A([])
      }  
    },
    set(key, value) {
      console.log("in set")
      if (this.selectAll == true) {
        this.set('selectAll', false);
      }
      else if (value.length == this.rows.length) {
        this.selectAll = true;
      }
      console.log(this.selectAll);
      return value;
    }
  })
  selected;

  @computed('selectedColumns', function() {
    return Table.create(this.selectedColumns, this.rows);
  })
  table;

  @action
  onFilterColumns(filteredColumns) {
    if(filteredColumns && filteredColumns.length > 0) {
      //debugger;
      this.set('selectedColumns', filteredColumns);
    }
  }
  
  specialCall() {
    this.set('selectAll', true);
  }
}

export default TableComponent;