import React from 'react'

export default function SubscriptionsTable() {

  return (
	<div>
    <table className="w-full text-sm text-left">
      <thead>
        <tr className=''>
          <th className='py-3 px-2'></th>
          <th className='py-3 px-2'>Free</th>
          <th className='py-3 px-2'>£1 Per Month</th>
          <th className='py-3 px-2'>£2 Per Month</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td className='py-3 px-2'><strong>Ideas Per Day</strong></td>
            <td className='py-3 px-2'>5</td>
            <td className='py-3 px-2'>10</td>
            <td className='py-3 px-2'>20</td>
          </tr>
          <tr>
            <td className='py-3 px-2'><strong>E-mail summaries</strong></td>
            <td className='py-3 px-2'>Monthly only</td>
            <td className='py-3 px-2'>Monthly or Weekly</td>
            <td className='py-3 px-2'>Monthly or Weekly</td>
          </tr>
      </tbody>
    </table>
	</div>
  )
}
