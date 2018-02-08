import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { FilterPanel } from 'src/features/home/FilterPanel';

describe('home/FilterPanel', () => {
  it('renders list of stashpoints when data is loaded', () => {
    const props = {
      home: {
        stashpointData: [{
          id: '9b229cc0b91d',
          created: '2018-02-02 18:12:03.229939',
          type: 'other',
          status: 'active',
          name: 'Hanover Hotel',
          location_name: 'Victoria',
          description: "Store your luggage at the Hanover Hotel, under 5 minutes from Victoria rail station and Victoria coach station. Perfect if you're arriving into London from Gatwick or by coach, or if you're travelling out later that day. The hotel is open 24/7 so you can drop your bags any time.\n <br/><br/>\n <b>Opening Hours</b>\n Open all hours! 24 hours a day, 7 days a week",
          featured: false,
          latitude: 51.490856,
          longitude: -0.143413,
          address: "30 St George's Drive, Pimlico, Victoria, London",
          postal_code: 'SW1V 4BN',
          country: 'GBR',
          photos: [
            'https://www.citystasher.com/albums/images/listings/2_citystasher_victoria_stashpoint_left_luggage_at_hanover_hotel_1.jpg',
            'https://www.citystasher.com/albums/images/listings/2_citystasher_victoria_stashpoint_left_luggage_at_hanover_hotel_2.jpg',
            'https://www.citystasher.com/albums/images/listings/2_citystasher_victoria_stashpoint_left_luggage_at_hanover_hotel_3.jpg'
          ],
          capacity: 99,
          opening_hours: [
            {
              day: 0,
              open: '00:00:00',
              close: '00:00:00'
            },
            {
              day: 1,
              open: '00:00:00',
              close: '00:00:00'
            },
            {
              day: 2,
              open: '00:00:00',
              close: '00:00:00'
            },
            {
              day: 3,
              open: '00:00:00',
              close: '00:00:00'
            },
            {
              day: 4,
              open: '00:00:00',
              close: '00:00:00'
            },
            {
              day: 5,
              open: '00:00:00',
              close: '00:00:00'
            },
            {
              day: 6,
              open: '00:00:00',
              close: '00:00:00'
            }
          ],
          opening_hours_exceptions: [],
          storage_forbidden_out_of_hours: false,
          open_twentyfour_seven: true,
          open_late: true,
          pricing_structure: {
            ccy: 'GBP',
            extra_day_commission: 235,
            extra_day_cost: 500,
            first_day_commission: 285,
            first_day_cost: 600
          },
          contact: {
            name: 'sanchitpatel sanchitpatel',
            email: 'reservations@hanoverhotel.co.uk',
            phone_number: ''
          },
          bags_last_30_days: 0,
          feefo_sku: '6828'
        }]
      },
      actions: {},
    };
    const renderedComponent = shallow(
      <FilterPanel {...props} />
    );

    expect(
      renderedComponent.find('.stashpoint-data').getElement()
    ).to.exist;
  });
});
